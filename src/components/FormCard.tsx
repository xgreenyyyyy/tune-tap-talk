import React, { useState } from 'react';
import { User, ExternalLink, CheckCircle } from 'lucide-react';
import InputField from './InputField';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const FormCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    songName: '',
    spotifyLink: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isValidSpotifyLink = (url: string) => {
    const spotifyRegex = /^https:\/\/(open\.)?spotify\.com\/(track|album|playlist)\/.+/;
    return spotifyRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      setIsSubmitting(false);
      return;
    }

    if (!formData.songName.trim()) {
      toast.error('Please enter a song name');
      setIsSubmitting(false);
      return;
    }

    if (!formData.spotifyLink.trim()) {
      toast.error('Please enter a Spotify link');
      setIsSubmitting(false);
      return;
    }

    if (!isValidSpotifyLink(formData.spotifyLink)) {
      toast.error('Please enter a valid Spotify link');
      setIsSubmitting(false);
      return;
    }

    try {
      // Save to Supabase
      const { error } = await supabase
        .from('music_submissions')
        .insert([
          {
            name: formData.name.trim(),
            song_name: formData.songName.trim(),
            spotify_link: formData.spotifyLink.trim()
          }
        ]);

      if (error) {
        console.error('Error saving submission:', error);
        toast.error('Failed to save your submission. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
      toast.success('Your music submission has been saved!');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', songName: '', spotifyLink: '' });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="backdrop-blur-xl bg-slate-gray/80 border border-light-gray/20 rounded-3xl p-8 shadow-2xl animate-scale-in">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-light-cyan to-lavender rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="w-8 h-8 text-slate-gray" />
            </div>
            <h2 className="text-2xl font-bold text-light-gray mb-4">Thank You!</h2>
            <p className="text-light-gray/80 mb-6">
              Your music submission has been saved to our database. We'll check out your song recommendation!
            </p>
            <button
              onClick={resetForm}
              className="bg-gradient-to-r from-lavender to-soft-pink text-slate-gray px-6 py-3 rounded-full font-medium hover:from-lavender/90 hover:to-soft-pink/90 transition-all duration-300 transform hover:scale-105"
            >
              Submit Another Song
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="backdrop-blur-xl bg-slate-gray/80 border border-light-gray/20 rounded-3xl p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-light-gray mb-2">Share Your Music</h1>
          <p className="text-light-gray/70">And see what happens next!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={User}
            label="Your Name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            required
          />

          <InputField
            icon={User}
            label="Song Name"
            placeholder="Enter the song title"
            value={formData.songName}
            onChange={(value) => handleInputChange('songName', value)}
            required
          />

          <InputField
            icon={ExternalLink}
            label="Spotify Link"
            placeholder="https://open.spotify.com/track/..."
            value={formData.spotifyLink}
            onChange={(value) => handleInputChange('spotifyLink', value)}
            required
            type="url"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-lavender to-soft-pink text-slate-gray py-4 rounded-2xl font-semibold text-lg hover:from-lavender/90 hover:to-soft-pink/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-gray mr-2"></div>
                Submitting...
              </div>
            ) : (
              'Submit Your Song'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormCard;