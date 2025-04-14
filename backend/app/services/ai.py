import httpx

LLM_API_URL = "https://openrouter.ai/api/v1/chat/completions"  # example
LLM_API_KEY = "your_openrouter_key"  # move to config for production

HEADERS = {
    "Authorization": f"Bearer {LLM_API_KEY}",
    "Content-Type": "application/json"
}

async def get_summary(email_text: str) -> str:
    payload = {
        "model": "mistralai/mistral-7b-instruct",  # or any available
        "messages": [
            {"role": "system", "content": "Summarize the following email."},
            {"role": "user", "content": email_text}
        ]
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(LLM_API_URL, headers=HEADERS, json=payload)
        result = response.json()
        return result["choices"][0]["message"]["content"]


async def get_smart_reply(email_text: str) -> str:
    payload = {
        "model": "mistralai/mistral-7b-instruct",
        "messages": [
            {"role": "system", "content": "Reply to this email professionally and concisely."},
            {"role": "user", "content": email_text}
        ]
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(LLM_API_URL, headers=HEADERS, json=payload)
        result = response.json()
        return result["choices"][0]["message"]["content"]
