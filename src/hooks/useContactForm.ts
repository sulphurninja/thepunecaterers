import { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  phone: string
  eventDate?: Date | null
  eventType?: string
  guestCount?: string
  location?: string
  message?: string
}

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const submitForm = async (formData: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Form submitted successfully!'
        })
        return { success: true, message: result.message }
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.'
        })
        return { success: false, message: result.error }
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection and try again.'
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      })
      return { success: false, message: errorMessage }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetStatus = () => {
    setSubmitStatus({ type: null, message: '' })
  }

  return {
    isSubmitting,
    submitStatus,
    submitForm,
    resetStatus
  }
}