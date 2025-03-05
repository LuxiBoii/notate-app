const markdown: string = `# Notate AI: Organize Your Life

**Notate AI** is a cutting-edge digital assistant designed to help you bring order to your daily tasks, appointments, and notes. Whether you're managing work projects, personal reminders, or creative ideas, Notate AI is here to streamline your life.

## Key Features

- **Task Management:** Organize your to-dos and priorities.
- **Calendar Integration:** Sync events and meetings across all your devices.
- **Note Taking:** Capture ideas, meeting notes, and important reminders.
- **Custom Reminders:** Set alerts for deadlines, birthdays, and more.
- **Personalization:** Tailor the interface to your workflow and style.

## Getting Started

1. **Sign Up:** Visit the [Notate AI website](https://notateai.com) and create your account.
2. **Download the App:** Available on [iOS](https://apps.apple.com) and [Android](https://play.google.com).
3. **Sync Your Data:** Connect your calendars and other apps to get started.

## Example Code Integration

Integrate Notate AI into your own applications using our API. Here's a simple example using Python:
\`\`\`
request.py
\`\`\`
\`\`\`python
import requests

# API endpoint and your API key for authentication
api_endpoint = "https://api.notateai.com/v1/notes"
api_key = "YOUR_API_KEY"

# Define a new note
note = {
    "title": "Project Meeting",
    "content": "Discuss quarterly results and new strategies."
}

# Create the note via POST request
response = requests.post(
    api_endpoint, 
    json=note, 
    headers={"Authorization": \`Bearer \${api_key}\`}
)

if response.status_code == 201:
    print("Note created successfully!")
else:
    print("Error creating note:", response.text)
\`\`\`
`;


export async function GET(request: Request) {
    const encoder = new TextEncoder();
    
    // Create a readable stream that sends chunks of text data.
    const stream = new ReadableStream({
      async start(controller) {
        const words = markdown.match(/\S+|\s+/g) || [];
        for (const word of words) {
          controller.enqueue(encoder.encode(word));
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        controller.close();
      },
    });
  
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }