export function LogoutOverlay({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP (Blur + Dim) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* MODAL CARD */}
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md animate-in fade-in zoom-in-95">
        <h2 className="text-xl font-semibold">Log out of your account?</h2>
        <p className="text-gray-600 mt-2">
          You will be logged out and returned to the login page.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Logout
          </button>

          <button
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            onClick={onCancel}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
