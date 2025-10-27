"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { supabase, type TeamMember } from "@/lib/supabase"
import { Linkedin, Twitter } from "lucide-react"

export function TeamMembers() {
  const [members, setMembers] = React.useState<TeamMember[]>([])
  const [loading, setLoading] = React.useState(true)
  const [expandedCard, setExpandedCard] = React.useState<string | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('order', { ascending: true })

        if (error) throw error
        setMembers(data || [])
      } catch (error) {
        console.error('Error fetching team members:', error)
        setMembers([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpandedCard(null)
      }
    }

    if (expandedCard) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [expandedCard])

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  if (loading) {
    return <div className="text-center">Loading team members...</div>
  }

  const displayMembers = members

  return (
    <div ref={containerRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {displayMembers.map((member) => {
        const isExpanded = expandedCard === member.id
        return (
          <Card 
            key={member.id} 
            className="group overflow-hidden p-0 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
            onClick={() => toggleCard(member.id)}
          >
            <div className="aspect-square overflow-hidden relative">
              {member.image_url && (
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              
              {/* Initial overlay - name and role only */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-red-500 font-semibold">{member.role}</p>
                </div>
              </div>
              
              {/* Hover/Expanded overlay - full content */}
              <div className={`absolute inset-0 bg-red-500/95 transition-all duration-300 flex flex-col justify-between p-6 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-sm text-white font-semibold mb-4">{member.role}</p>
                  <p className="text-sm text-white/90 leading-relaxed">{member.bio}</p>
                </div>
                
                <div className="flex gap-4 mt-4">
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-black hover:scale-110 transition-all duration-300"
                      aria-label={`${member.name} on LinkedIn`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                  )}
                  {member.twitter_url && (
                    <a
                      href={member.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-black hover:scale-110 transition-all duration-300"
                      aria-label={`${member.name} on Twitter`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

