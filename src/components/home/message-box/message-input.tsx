import * as formik from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import * as yup from "yup";
import { submitChat } from "../../../redux/slices/chat/action";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";

interface IProps {}
const MessageInputComponent: React.FC<IProps> = (props: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { Formik } = formik;
  const { receiver, activeChannel } = useAppSelector((state) => state.chat);

  const schema = yup.object().shape({
    message: yup.string().required(),
  });
  const handleSubmit = async (values: { message: string }, actions: any) => {
    const { setSubmitting, resetForm } = actions;
    const { message } = values;
    const { uid } = user!;
    dispatch(
      submitChat({
        message: {
          text: message,
          sender: uid,
          receiver: receiver.uid!,
          unRead: true,
          channelId: activeChannel,
        },
      })
    );
    resetForm();

    setSubmitting(false);
  };

  const onKeyDown = async (event: any, submitForm: any) => {
    if (!receiver || !activeChannel) {
      alert("Choose a receiver");
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      await submitForm();
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        message: "",
      }}
    >
      {({ handleSubmit, submitForm, handleChange, values, errors }) => (
        <Form className="mb-3" onSubmit={handleSubmit}>
          <Form.Group controlId="messageInput">
            <Form.Control
              type="text"
              name="message"
              value={values.message}
              placeholder="Type your message..."
              onChange={handleChange}
              isInvalid={!!errors.message}
              onKeyDown={(e: any) => onKeyDown(e, submitForm)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};
export default MessageInputComponent;
