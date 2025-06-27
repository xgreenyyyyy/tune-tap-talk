
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, Music, User, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface Submission {
  id: string;
  name: string;
  song_name: string;
  spotify_link: string;
  created_at: string;
}

const Submissions = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('submissions_authenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'gee10jali') {
      setIsAuthenticated(true);
      sessionStorage.setItem('submissions_authenticated', 'true');
      toast.success('Access granted!');
    } else {
      toast.error('Incorrect password');
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('music_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        toast.error('Failed to load submissions');
      } else {
        setSubmissions(data || []);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-gray via-slate-gray to-slate-gray/90 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-slate-gray/80 border border-light-cyan/20 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-light-gray mb-2">Access Required</h1>
              <p className="text-light-gray/70">Enter password to view submissions</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-light-gray/80">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-4 bg-slate-gray/50 border border-light-gray/20 rounded-2xl text-light-gray placeholder-light-gray/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-light-cyan/50 focus:border-light-cyan/50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-lavender to-soft-pink text-slate-gray py-4 rounded-2xl font-semibold text-lg hover:from-lavender/90 hover:to-soft-pink/90 transition-all duration-300 transform hover:scale-105"
              >
                Access Submissions
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                to="/" 
                className="text-light-cyan hover:text-light-cyan/80 text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-gray via-slate-gray to-slate-gray/90 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-light-gray mb-2">Music Submissions</h1>
            <p className="text-light-gray/70">
              {submissions.length} song{submissions.length !== 1 ? 's' : ''} submitted
            </p>
          </div>
          <Link 
            to="/" 
            className="flex items-center space-x-2 bg-slate-gray/80 hover:bg-slate-gray/90 text-light-gray px-4 py-2 rounded-lg border border-light-cyan/20 backdrop-blur-xl transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-light-cyan"></div>
          </div>
        ) : (
          /* Submissions Grid */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {submissions.map((submission) => (
              <div 
                key={submission.id}
                className="backdrop-blur-xl bg-slate-gray/60 border border-light-cyan/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-lavender to-soft-pink rounded-full flex items-center justify-center">
                      <Music className="w-5 h-5 text-slate-gray" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-light-gray text-lg">{submission.song_name}</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-light-gray/80">
                    <User className="w-4 h-4 text-light-cyan" />
                    <span className="text-sm">{submission.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-light-gray/80">
                    <Calendar className="w-4 h-4 text-light-cyan" />
                    <span className="text-sm">
                      {new Date(submission.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <a
                  href={submission.spotify_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-lavender to-soft-pink text-slate-gray px-4 py-2 rounded-lg font-medium hover:from-lavender/90 hover:to-soft-pink/90 transition-all duration-300 transform hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Listen on Spotify</span>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && submissions.length === 0 && (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-light-gray/50 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-light-gray mb-2">No submissions yet</h2>
            <p className="text-light-gray/70">Submissions will appear here once people start sharing their music.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submissions;
