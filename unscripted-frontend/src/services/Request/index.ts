import { toast } from "react-toastify"

async function send(uri: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(uri, init)
  if (response.ok) {
    return await response.json()
  } else {
    try {
      const jsonResponse = await response.json()
      throw new Error(jsonResponse.message)
    } catch (err) {
      throw new Error(
        `Could not parse error message. Response is ${response.status}`
      )
    }
  }
}

export async function sendWithToast(
  uri: string,
  init?: RequestInit
): Promise<any> {
  try {
    return await send(uri, init)
  } catch (err: any) {
    console.error({ err })
    toast.error(err)
    return false
  }
}

export async function sendRequest(
  uri: string,
  init?: RequestInit
): Promise<any> {
  try {
    return await send(uri, init)
  } catch (err) {
    console.error({ err })
    return false
  }
}
