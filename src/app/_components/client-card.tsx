"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface Client {
  id: number;
  name: string;
  age: number;
  gender: string;
  hobby: string;
}

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  const router = useRouter();
  const deleteClient = api.client.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete the card?`)) {
      deleteClient.mutate({ id: client.id });
    }
  };

  return (
    <div className="flex max-w-xs flex-col gap-2 rounded-xl border border-green-700 bg-green-400/80 p-4 text-gray-900 shadow-lg transition-transform duration-300 hover:-translate-y-4 hover:scale-110 hover:shadow-2xl">
      <h3 className="text-2xl font-bold">{client.name}</h3>
      <div className="text-sm">Age: {client.age}</div>
      <div className="text-sm">Gender: {client.gender}</div>
      <div className="text-sm">Hobby: {client.hobby}</div>
      <button
        onClick={handleDelete}
        disabled={deleteClient.isPending}
        className="mt-4 self-end text-red-500 hover:text-red-600 disabled:opacity-50"
        title="Delete"
      >
        {deleteClient.isPending ? (
          <span className="text-sm text-red-600">Deleting...</span>
        ) : (
          <FontAwesomeIcon icon={faTrash} size="lg" />
        )}
      </button>
    </div>
  );
}
