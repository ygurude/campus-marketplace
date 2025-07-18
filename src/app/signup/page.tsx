'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '../../lib/services/auth';
import { Button } from '../../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { NextResponse } from 'next/server';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: 8 }, (_, i) => currentYear + i);

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  university: z.string().min(1, 'Please select a university'),
  major: z.string().min(2, 'Major must be at least 2 characters'),
  graduationYear: z.string().min(1, 'Please select a graduation year'),
  profilePicture: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  phoneNumber: z.string().optional().or(z.literal('')),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState<string[]>([]);
  const [universitiesLoading, setUniversitiesLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/universities')
      .then(res => res.json())
      .then(data => {
        const names = Array.isArray(data.universities) ? data.universities : [];
        setUniversities(names);
        setUniversitiesLoading(false);
      })
      .catch((e) => {
        console.error('Hipolabs API error:', e);
        return NextResponse.json({ error: 'Server error', details: String(e) }, { status: 500 });
      });
  }, []);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      university: '',
      major: '',
      graduationYear: '',
      profilePicture: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: SignupForm) => {
    setError('');
    setLoading(true);

    try {
      await createUser({
        email: data.email || "",
        password: data.password || "",
        displayName: data.name || "",
        university: data.university || "",
        major: data.major || "",
        graduationYear: data.graduationYear || "",
        profilePicture: data.profilePicture || "",
        phoneNumber: data.phoneNumber || "",
      });
      await signOut(auth);
      router.push('/verify-email');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-8 w-full max-w-md flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Create your account</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Student" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="student@university.edu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                      disabled={universitiesLoading}
                    >
                      <option value="">
                        {universitiesLoading ? "Loading universities..." : "Select University"}
                      </option>
                      {universities.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Major</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="graduationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Year</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                    >
                      <option value="">Select Year</option>
                      {graduationYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture URL <span className="text-gray-400">(optional)</span></FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com/photo.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number <span className="text-gray-400">(optional)</span></FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="e.g., +1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="mt-2"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm text-gray-500 mt-2">
          Already have an account? <a href="/login" className="text-black font-semibold hover:underline">Sign in</a>
        </div>
      </div>
    </div>
  );
} 