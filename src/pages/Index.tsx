import FormCard from '@/components/FormCard';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-gray flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-light-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-soft-pink/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lavender/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <FormCard />
      </div>

      {/* Footer */}
      <div className="fixed bottom-6 left-0 right-0 text-center">
        <p className="text-light-gray/70 text-sm">
          Share your favorite tracks and discover new music
        </p>
      </div>
    </div>
  );
};

export default Index;