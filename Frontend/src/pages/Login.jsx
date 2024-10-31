import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import { Label } from "@/components/ui/label"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import { Switch } from "@/components/ui/switch"
  import React, { useState } from 'react';
  

function Login() {

    
    const [isVisible, setIsVisible] = useState(false); // State to manage visibility
   
    const togglePasswordVisibility = () => {
        setIsVisible(!isVisible); // Toggle visibility
      };
   
   
    return (
        
        <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Meetup</CardDescription>
        </CardHeader>
        <CardContent> 
        <div className="grid w-full gap-4">
            <div className="grid gap-2 items-start space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="username" placeholder="JohnDoe123" />
          </div>
        </div>
        <div className="grid gap-2 items-start space-y-2">
          <Label className="Label-password">Password</Label>
          <Input id="password" type={isVisible ? "text" : "password"}  /> 
        {/*   // Toggle password visibility */}

        <Switch 
          type="button" 
          onClick={togglePasswordVisibility} 
          className="text-blue-500"  // Add your styles here
          checked={isVisible} // Set checked state
        />

{/* 
        <button 
          type="button" 
          onClick={togglePasswordVisibility} 
          className="text-blue-500" // Add your styles here
        > 
          {isVisible ? 'Hide' : 'Show'} 
        </button> 
         */}
         
        </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Login</Button>
          <Button className="w-full" variant="outline">Register</Button>
        </CardFooter>
      </Card>
      
    );
}

export default Login;