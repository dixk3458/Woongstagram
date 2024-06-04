export default function CommentForm() {
  return (
    <form className="flex border-t">
      <input type="text" className="grow border-none outline-none py-2 px-4" />
      <button className="bg-gradient-to-bl from-indigo-300 via-purple-300 to-pink-300 font-bold p-2">
        POST
      </button>
    </form>
  );
}
