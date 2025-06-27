
import FormCard from '@/components/FormCard';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-gray via-slate-gray to-slate-gray/90 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-light-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-lavender/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-soft-pink/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <FormCard />
      </div>

      {/* Admin Link */}
      <Link
        to="/submissions"
        className="fixed top-6 right-6 z-20 flex items-center space-x-2 bg-slate-gray/80 hover:bg-slate-gray/90 text-light-gray px-4 py-2 rounded-lg border border-light-cyan/20 backdrop-blur-xl transition-all duration-300 hover:scale-105"
      >
        <Eye className="w-4 h-4" />
        <span className="text-sm">View Submissions</span>
      </Link>

      {/* Footer */}
      <div className="fixed bottom-6 left-0 right-0 text-center">
        <p className="text-light-gray/50 text-sm">
          
        </p>
      </div>
    </div>
  );
};

export default Index;
