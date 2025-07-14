export default function SignupPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-8 w-full max-w-md flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Create your account</h1>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input id="name" type="text" autoComplete="name" required className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input id="email" type="email" autoComplete="email" required className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input id="password" type="password" autoComplete="new-password" required className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300" />
          </div>
          <button type="submit" className="mt-2 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg px-6 py-2 text-base transition-colors">Sign Up</button>
        </form>
        <div className="text-center text-sm text-gray-500 mt-2">
          Already have an account? <a href="/login" className="text-black font-semibold hover:underline">Sign in</a>
        </div>
      </div>
    </div>
  );
} 