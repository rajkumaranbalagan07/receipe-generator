import Image from 'next/image'
import { Inter } from 'next/font/google'
import Dropdown, { Option } from '@/components/Dropdown'
import { useState } from 'react';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import { Configuration, OpenAIApi } from "openai";
import Loader from '@/components/Loader';
import Input from '@/components/Input';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const cuisineOptions: Option[] = [
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'indian', label: 'Indian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'mediterranean', label: 'Mediterranean' },
  ];

  const dietaryOptions: Option[] = [
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'glutenFree', label: 'Gluten-free' },
    { value: 'dairyFree', label: 'Dairy-free' },
    { value: 'lowCarb', label: 'Low-carb' },
  ];

  const ingredientOptions: Option[] = [
    { value: 'chicken', label: 'Chicken' },
    { value: 'tofu', label: 'Tofu' },
    { value: 'bellPeppers', label: 'Bell peppers' },
    { value: 'quinoa', label: 'Quinoa' },
    { value: 'sweetPotatoes', label: 'Sweet potatoes' },
  ];

  const [output, setOutput] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDietary, setSelectedDietary] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [rows, setRows] = useState(0);

  const handleCuisineChange = (value: string) => {
    setSelectedCuisine(value);
  };

  const handleDietaryChange = (value: string) => {
    setSelectedDietary(value);
  };

  const handleIngredientChange = (value: string) => {
    setSelectedIngredient(value);
  };


  const handleInputButtonClick = (value: string) => {
    setInputValue(value);
  };

  const fetchOpenAIOutput = async () => {

    setIsLoading(true); // set loading to true before making the API call
    const configuration = new Configuration({
      apiKey: process.env.OPEN_API_KEY
    });
    delete configuration.baseOptions.headers['User-Agent'];

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user", content: `Act a chef expert suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not 
      time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness 
      so overall dish ends up being healthy yet economical at same time based on the content ${selectedCuisine
          } and the ${selectedIngredient}
        and the ${selectedDietary}, give me the detailed receipe details ${inputValue}`
      }],
    });


    console.log(completion.data.choices[0].message!['content']);
    setOutput(completion.data.choices[0].message!['content'] as any);
    setRows(completion.data.choices[0].message!['content'].split("\n").length)
    setIsLoading(false); // set loading to false after receiving the response
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ">
      <main className='flex items-center justify-center'>
        <div className="flex flex-col  p-20 space-y-8 space-x-8 rounded-lg bg-amber-70 w-1/2" >
          <h1 className='text-5xl  text-white text-center'>Chef GPT</h1>
          <Dropdown options={cuisineOptions} onSelect={handleCuisineChange} />
          <Dropdown options={dietaryOptions} onSelect={handleDietaryChange} />
          <Dropdown options={ingredientOptions} onSelect={handleIngredientChange} />
          <Input onButtonClick={handleInputButtonClick} />
          <Button onClick={fetchOpenAIOutput} disabled={isLoading}>{isLoading ? 'Preparing the Receipe........' : 'Get Recipe'}</Button>
          {isLoading ? <Loader /> : <TextArea value={output} rows={rows} />}
        </div>
      </main>
    </div>
  )
}