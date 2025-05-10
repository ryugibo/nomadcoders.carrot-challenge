"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

export default function ModalTweetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const onClickClose = () => router.back();

  return (
    <div
      className="fixed inset-0 bg-neutral-600/50 flex items-center justify-center z-50"
      onClick={onClickClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2">Tweet #{id}</h2>
        <p>This is the modal content for tweet ID {id}.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onClickClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
