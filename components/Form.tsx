import { FormTypes, INewPost, IPost } from "@/types/types";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type FormProps = {
  type: FormTypes;
  post: INewPost;
  setPost: Dispatch<SetStateAction<{ prompt: string; tag: string }>>;
  submitting: boolean;
  handleSubmit: (e: React.SyntheticEvent) => void;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <section className="flex-start w-full max-w-full flex-col">
      <h1 className="head_text text-left">
        <span className="primary_gradient">{type}</span> Post
      </h1>
      <p className="desc max-w-md text-left">
        {type} and share amazing prompts with the world.
      </p>
      <form
        onSubmit={handleSubmit}
        className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7"
      >
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #web-development, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="primary_gradient_bg rounded-full px-5 py-1 text-sm text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
