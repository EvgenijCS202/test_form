import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "./App.module.css";
import { IForm } from "./models/IForm";
import { useActions, useAppSelector } from "./hooks/redux";
import { postsApi } from "./api/postsApi";

function App() {
  const { updateForm } = useActions();

  const [limit, setLimit] = useState(5);
  const { data: posts } = postsApi.useFetchPostsQuery(limit);
  const globalState = useAppSelector((state) => ({
    form: state.formReducer.form,
    posts,
  }));

  const form = useForm<IForm>({
    defaultValues: {
      email: "",
      questions: [{ value: "" }],
    },
    mode: "onTouched",
  });
  const { register, control, handleSubmit, formState } = form;

  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
    rules: { minLength: 1 },
  });

  const { errors } = formState;

  const onSubmit = (data: IForm) => {
    updateForm(data);
  };

  React.useEffect(() => {
    console.log("Global form state:\n", globalState);
  }, [globalState]);

  return (
    <div className={styles.screen}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={styles.fields}>
          <div className={styles.field}>
            <label>E-mail</label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required!",
                },
              })}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className={styles.questions}>
            {fields.map((field, index) => (
              <div className={styles.field} key={field.id}>
                <label>Question {index + 1}</label>
                <input
                  {...register(`questions.${index}.value`, {
                    required: {
                      value: true,
                      message: "Type your question!",
                    },
                  })}
                />
                <p>{errors.questions?.[index]?.value?.message}</p>
                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)}>
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            type="button"
            onClick={() => append({ value: "" })}
          >
            Add
          </button>
          <button className={styles.button}>Submit</button>
        </div>
      </form>
      <div className={styles.posts}>
        {posts?.length &&
          posts.map((post) => (
            <div className={styles.post} key={post.id}>
              {post.id}. {post.title}
            </div>
          ))}
        <button type="button" onClick={() => setLimit((lim) => lim + 5)}>
          More
        </button>
      </div>
    </div>
  );
}

export default App;
