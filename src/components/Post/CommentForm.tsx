import SmileIcon from '../UI/Icons/SmileIcon';

export default function CommentForm() {
  return (
    <form className="flex  items-center border-t px-3 border-neutral-300">
      <SmileIcon />
      <input
        className="w-full ml-2 p-3 border-none outline-none"
        type="text"
        placeholder="Add a comment..."
      />
      <button className="font-bold text-orange-500 ml-2">Post</button>
    </form>
  );
}
