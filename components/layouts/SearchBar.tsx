'use client'

import axios from 'axios'
import { Users } from 'lucide-react'
import debounce from 'lodash.debounce'
import { useQuery } from '@tanstack/react-query'
import { Prisma, Subforum } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const SearchBar = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  const commandRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const pathname = usePathname()

  const request = debounce(async () => {
    refetch()
  }, 500)

  const debounceRequest = useCallback(() => {
    request()
  }, [])

  const {
    data: queryResults = [],
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return []
      const { data } = await axios.get(`/api/search?q=${input}`)
      return data as (Subforum & { _count: Prisma.SubforumCountOutputType })[]
    },
    queryKey: ['search-query'],
    enabled: false,
  })



  useOnClickOutside(commandRef, () => {
    setInput('')
  })

  useEffect(() => {
    setInput('')
  }, [pathname])

  useEffect(() => {
    setIsMounted(true)
  }, [])



  if (!isMounted) {
    return null
  }

  return (
    <Command
      ref={commandRef}
      className="relative rounded-full border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        onValueChange={(text) => {
          setInput(text)
          debounceRequest()
        }}
        value={input}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search for communities..."
      />

      {/* Render results if input is not undefined */}
      {(queryResults) && (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
          {(input.length !== 0 && isFetched) && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {queryResults.map((subforum) => (
            <CommandItem
              onSelect={() => {
                router.push(`/community/${subforum.name}`)
                router.refresh()
              }}
              key={subforum.id}
              value={subforum.name}
            >
              <Users className="mr-2 h-4 w-4" />
              <a href={`/community/${subforum.name}`}>r/{subforum.name}</a>
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  )
}

export default SearchBar
