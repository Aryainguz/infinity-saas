"use client"
import { useState } from 'react';
import Dashboard from '@/components/HOC/Dashboard';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';

const WebsiteBuilderChat = () => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [collectedParams, setCollectedParams] = useState({
    logo: '',
    name: '',
    description: '',
    industry: '',
    location: '',
    linkedin: '',
    contact: '',
    email: '',
    primary_color: ''
  });
  const [step, setStep] = useState(0); // Tracks the step in the chatbot conversation

  // API call to website-builder endpoint
  const callWebsiteBuilderAPI = async (params: typeof collectedParams) => {
    try {
      const response = await fetch('/api/create-web', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });

      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error calling website builder API:', error);
      return 'Error processing the request.';
    }
  };

  // Handle form submission for user input
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: 'user', text: input }]);

    const newParams = { ...collectedParams };

    // Step-wise collection of params
    switch (step) {
      case 0:
        newParams.logo = input; // Assuming the first input is for the logo URL
        setMessages((prev) => [
          ...prev,
          { from: 'ai', text: 'What is the name of your company?' }
        ]);
        break;
      case 1:
        newParams.name = input;
        setMessages((prev) => [
          ...prev,
          { from: 'ai', text: 'Can you provide a short description of your company?' }
        ]);
        break;
      case 2:
        newParams.description = input;
        setMessages((prev) => [
          ...prev,
          { from: 'ai', text: 'What industry does your company belong to?' }
        ]);
        break;
      case 3:
        newParams.industry = input;
        setMessages((prev) => [
          ...prev,
          { from: 'ai', text: 'Where is your company located?' }
        ]);
        break;
      case 4:
        newParams.location = input;
        setMessages((prev) => [
          ...prev,
          { from: 'ai', text: 'What is your company’s LinkedIn profile URL?' }
        ]);
        break;
      case 5:
        newParams.linkedin = input;
        setMessages((prev) => [
          ...prev,
          { from: 'ai', text: 'What is the contact number for your company?' }
        ]);
        break;
      case 6:
        newParams.contact = input;
        setMessages((prev) => [
          ...prev,
          { from: 'ai', text: 'What is your company’s email address?' }
        ]);
        break;
      case 7:
        newParams.email = input;
        setMessages((prev) => [
          ...prev,
          { from: 'ai', text: 'What is the primary color for your website (e.g., #ff5733 or red)?' }
        ]);
        break;
      case 8:
        newParams.primary_color = input;

        // All parameters collected, call API
        const apiResponse = await callWebsiteBuilderAPI(newParams);
        console.log(apiResponse)
        setMessages((prev) => [...prev, { from: 'ai', 
          text: `Click here to view your website: ` + 
          <Link href={apiResponse.success} target="_blank">View Website</Link> 



         }]);

        // Reset conversation for a new interaction
        setStep(0);
        setCollectedParams({
          logo: '',
          name: '',
          description: '',
          industry: '',
          location: '',
          linkedin: '',
          contact: '',
          email: '',
          primary_color: ''
        });
        break;
      default:
        break;
    }

    setCollectedParams(newParams);
    setInput(''); // Clear input field
    setStep((prevStep) => prevStep + 1); // Move to the next step
  };

  return (
    <Dashboard>
 <div className="flex h-screen w-full flex-col bg-white">
        <main className="flex flex-1 flex-col gap-4 overflow-auto p-4 lg:flex-row lg:gap-0">
          {/* Left Partition */}
          <div className="flex-1 bg-light-gray p-4 lg:rounded-l-xl lg:border-r lg:border-gray-200">
            <div className="flex flex-col gap-3 h-full overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`self-${msg.from === 'ai' ? 'start' : 'end'} bg-${msg.from === 'ai' ? 'gray-100' : 'blue-500'} text-${msg.from === 'ai' ? 'black' : 'white'} p-3 rounded-lg max-w-xs`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Partition */}
          <div className="w-full lg:w-80 bg-light-gray p-4 lg:rounded-r-xl">
            <form
              className="flex flex-col h-full justify-between bg-white rounded-lg border border-gray-200 shadow-sm"
              onSubmit={handleSubmit}
            >
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none"
              />
              <Button type="submit" size="sm" className="ml-auto mt-2 mb-2 w-full bg-blue-500 text-white">
                Send Message
              </Button>
            </form>
          </div>
        </main>
      </div>
    </Dashboard>
  );
};

export default WebsiteBuilderChat;
