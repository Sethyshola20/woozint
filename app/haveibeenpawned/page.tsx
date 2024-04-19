"use client"

export default function HaveIBeenPawned() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const response = await fetch("/api/haveibeenpawned", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        alert(data.text)
        return data
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <button type="submit">Submit</button>
        </form>
    )
}