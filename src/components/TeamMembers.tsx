"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { supabase, type TeamMember } from "@/lib/supabase"
import { Linkedin, Twitter } from "lucide-react"

export function TeamMembers() {
  const [members, setMembers] = React.useState<TeamMember[]>([])
  const [loading, setLoading] = React.useState(true)

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
        // Use fallback data
        setMembers(fallbackTeamMembers)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  if (loading) {
    return <div className="text-center">Loading team members...</div>
  }

  const displayMembers = members.length > 0 ? members : fallbackTeamMembers

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {displayMembers.map((member) => (
        // remove Card internal padding so the image can touch the card edges
        <Card key={member.id} className="overflow-hidden p-0">
          {member.image_url && (
            <div className="aspect-square overflow-hidden">
              <img
                src={member.image_url}
                alt={member.name}
                className="block h-full w-full object-cover"
              />
            </div>
          )}
          <CardContent className="p-6">
            <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
            <p className="mb-3 text-sm text-primary">{member.role}</p>
            <p className="mb-4 text-sm text-muted-foreground">{member.bio}</p>
            <div className="flex gap-3">
              {member.linkedin_url && (
                <a
                  href={member.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {member.twitter_url && (
                <a
                  href={member.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`${member.name} on Twitter`}
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Fallback team members
const fallbackTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Nishant Sharma",
    role: "Founder and Partner",
    bio: "Industry expert with deep knowledge of Bitcoin infrastructure and capital markets. Founded BlocksBridge to bring strategic communications expertise to Bitcoin miners and treasury companies.",
    image_url: "https://blocksbridge.com/wp-content/uploads/2025/09/ChatGPT-Image-Sep-4-2025-11_35_31-AM.png",
    linkedin_url: "https://www.linkedin.com/in/nishantsharma87/",
    twitter_url: "https://x.com/nishantsharma87",
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jesse Colzani",
    role: "Partner, Strategic Communications & Client Advisory",
    bio: "Senior communications strategist specializing in Bitcoin and energy sector messaging. Brings extensive experience in corporate narrative development and stakeholder engagement.",
    image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    linkedin_url: "https://www.linkedin.com/in/jesse-cz/",
    twitter_url: "",
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Wolfie Zhao",
    role: "Head of Research - TheMinerMag",
    bio: "Leading research and analysis for TheMinerMag, providing data-driven insights into Bitcoin mining market structure and company performance.",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    linkedin_url: "",
    twitter_url: "https://x.com/WolfieZhao",
    order: 3,
    created_at: new Date().toISOString(),
  },
]