import axios from 'axios'
import { Post } from '../interface/PostInterface'
import { UserProfile } from '../interface/UserInterface'

const baseURL = import.meta.env.VITE_API_URL

export const getAllPost = async (): Promise<Post[] | null> => {
  try {
    const response = await axios.get(`${baseURL}/posts`)
    if (response) {
      const data: Post[] = response.data
      return data
    }
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
  }
  return null
}

export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    const response = await axios.get(`${baseURL}/posts/${postId}`)
    if (response) {
      const data: Post = response.data
      return data
    }
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
  }
  return null
}

export const searchUser = async (
  query: string
): Promise<UserProfile | null> => {
  try {
    const response = await axios.get(`${baseURL}/users/search?query=${query}`)
    if (response) {
      const data: UserProfile = response.data
      return data
    }
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
  }
  return null
}
