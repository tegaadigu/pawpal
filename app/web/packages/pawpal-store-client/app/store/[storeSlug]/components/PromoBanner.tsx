'use client';

export const PromoBanner = () => {
  return (
     <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-8">
     {["Get 10% Off", "Dogs Foods", "Black Friday"].map((title, index) => (
       <div key={index} className="p-6 bg-gray-100 dark:bg-gray-900 rounded-xl text-center">
         <h3 className="text-xl font-semibold">{title}</h3>
         <p className="text-gray-600 dark:text-gray-400">Limited-time offer</p>
         <button className="mt-3 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg">Shop Now</button>
       </div>
     ))}
   </section>
  )
}