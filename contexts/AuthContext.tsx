'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { Usuario } from '@/lib/supabase'
import { truncateSync } from 'node:fs'

interface AuthContextType {
  user: User | null
  usuario: Usuario | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: Partial<Usuario>) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<Usuario>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obter sessão inicial
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchUsuario(session.user.id)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUsuario(session.user.id)
        } else {
          setUsuario(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUsuario = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Erro ao buscar usuário:', error)
        return
      }

      setUsuario(data)
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error }
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signUp = async (email: string, password: string, userData: Partial<Usuario>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return { error }
      }

      if (data.user) {
        // Criar registro na tabela usuarios
        const { error: profileError } = await supabase
          .from('usuarios')
          .insert([
            {
              id: data.user.id,
              email: email,
              nome: userData.nome || '',
              sobrenome: userData.sobrenome || '',
              cpf: userData.cpf,
              telefone: userData.telefone,
              data_nascimento: userData.data_nascimento,
              genero: userData.genero,
              endereco: userData.endereco,
              cidade: userData.cidade,
              estado: userData.estado,
              cep: userData.cep,
              bio: userData.bio,
              avatar_url: userData.avatar_url,
              tipo_usuario: userData.tipo_usuario || 'aluno',
              email_verificado: true,
              telefone_verificado: true,
            }
          ])

        if (profileError) {
          console.error('Erro ao criar perfil:', profileError)
          return { error: profileError }
        }
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const updateProfile = async (data: Partial<Usuario>) => {
    try {
      if (!user) {
        return { error: new Error('Usuário não autenticado') }
      }

      const { error } = await supabase
        .from('usuarios')
        .update(data)
        .eq('id', user.id)

      if (error) {
        return { error }
      }

      // Atualizar estado local
      if (usuario) {
        setUsuario({ ...usuario, ...data })
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const value = {
    user,
    usuario,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
} 