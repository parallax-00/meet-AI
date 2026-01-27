"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client
export default function Home() {
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    authClient.signUp.email(
      {
        name, // user display name
        email, // user email address
        password, // user password -> min 8 characters by default
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          window.alert("Success");
          //redirect to the dashboard or sign in page
        },
        onError: () => {
          // display the error message
          window.alert("Something went wrong!");
        },
      },
    );
  };
  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <p>Already signed in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}> Sign Out </Button>
      </div>
    );
  }
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={onSubmit}> Create User </Button>
    </div>
  );
}
