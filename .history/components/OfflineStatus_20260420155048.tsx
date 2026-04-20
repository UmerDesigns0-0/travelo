export default function OfflineStatus() {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-2xl font-bold">No Internet Connection</h1>
      <p>Please check your network and try again.</p>
      <button onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );
}