const RESPONSES = {
  HELP: "🚨 Triggering emergency response. Sharing your location with nearby authorities. Stay calm, help is on the way.",
  "find safe routes":
    "I can help you find the safest route. Would you like me to check nearby safe zones?",
  "legal help":
    "I can connect you with legal resources. Would you like information about women's rights or contact details for legal aid?",
  // Add more responses as needed
};

export const handleBotResponse = async (message: string): Promise<string> => {
  const lowercaseMessage = message.toLowerCase();

  if (lowercaseMessage === "help" || lowercaseMessage === "emergency") {
    return RESPONSES["HELP"];
  }

  // Add more complex logic here for NLP integration
  return "I understand you need assistance. How can I help you today?";
};
