'use client'
import axios from '@/lib/axios'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

// List of valid models for selects
const validModels = ['professors', 'courses', 'roles', 'users']

// Accepts config object like { units: true }
export default function useSelectOptions(config = {}) {
  const initialOptions = {}
  Object.keys(config).forEach((key) => {
    if (config[key] && validModels.includes(key)) {
      initialOptions[key] = []
    }
  })

  const [options, setOptions] = useState(initialOptions)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const promises = []
        const keys = []
        Object.entries(config).forEach(([key, shouldFetch]) => {
          if (shouldFetch && validModels.includes(key)) {
            promises.push(axios.get(`/selects/${key}`))
            keys.push(key)
          }
        })

        const responses = await Promise.all(promises)

        const data = responses.map((response) => {
          return (
            response?.data?.data?.map((item) => ({
              label: item.value,
              value: item.key,
              ...(item.icon ? { icon: item.icon } : {}),
            })) || []
          )
        })

        setOptions((prevOptions) => {
          const newOptions = { ...prevOptions }
          keys.forEach((key, index) => {
            newOptions[key] = data[index]
          })
          return newOptions
        })
      } catch (err) {
        const error = errorHandler(err)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (
      Object.keys(config).some(
        (key) => config[key] && validModels.includes(key)
      )
    ) {
      fetchOptions()
    }
  }, [config])

  return { options, isLoading, error }
}
