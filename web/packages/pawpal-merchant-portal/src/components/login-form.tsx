import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form"
import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/hooks/use-auth"
import { useLoginForm } from "@/hooks/use-login-form"

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Enter a valid email."
  }).email('invalid email entered')
})

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  })

 const { onLoginSuccess, onLoginError, error} = useLoginForm();
  const { handleLogin } = useAuth({ onLoginSuccess, onLoginError })

  const onSubmit = React.useCallback(async (values: z.infer<typeof formSchema>) => {
    const response = await handleLogin(values)
    console.log('response -->', response)
  }, [handleLogin])
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="m@example.com"
                      />
                    </FormControl>
                    {
                      (formState?.errors?.email || error) && (
                        <FormDescription className="text-sm text-red-500">
                        {formState?.errors?.email?.message || error || 'Unkown Error'}
                      </FormDescription>
                      )
                    }
                 
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
