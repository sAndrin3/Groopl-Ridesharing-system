import { Stack, Button, Box } from "@chakra-ui/react";
import { DatePickerInput } from "chakra-datetime-picker";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../components/inputField";
import { Layout } from "../components/Layout";
import { useCreateRideMutation } from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";


interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, createRide] = useCreateRideMutation();
  const router = useRouter();

  return (
    <Layout
      variant="small"
      heading="Create a Ride"
      text="set up a ride"
      form
      top
    >
      <Formik
        initialValues={{ from: "", to: "", when: Date.now(), seats: 0 }}
        onSubmit={async (values) => {
          const response = await createRide({ input: values });
          if (response.data?.createRide) {
            console.log(response)
            router.push("/offers");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="from"
              placeholder="Kutus"
              label="Pick-up point"
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="to"
              placeholder="Kerugoya"
              label="Destination"
              required={true}
            />
            <Box mt={4} />
            <DatePickerInput
              name="when"
              placeholder="DD/MM/YY 00:00"

            />
            <InputField
              name="seats"
              placeholder="0"
              label="no. of seats"
              required={true}
            />

            <Box mt={8} />
            <Stack>
              <Button
                isLoading={isSubmitting}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Create Ride
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient)(Register);
