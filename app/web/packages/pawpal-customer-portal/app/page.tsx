import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function Home() {
  const token = cookies().get('token')?.value;

  if(token) {
    try {
      const decodedToken = jwt.verify(token, "");

      if(decodedToken) {
        redirect("/store");
      }else {
        redirect('/login')
      }
    }catch(e) {
      console.log('error - decoding -->');
      redirect("/login")
    }
  }else {
    redirect('/login');
  }
  
}
