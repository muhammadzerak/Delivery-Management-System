"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input({ label, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-semibold">{label}</label>}
            <input
                {...props}
                className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
        </div>
    );
}
