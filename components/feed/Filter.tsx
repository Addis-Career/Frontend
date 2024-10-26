import {
  Card,
  CardHeader,
  CardBody,
  Checkbox,
  Button,
  Input,
} from "@nextui-org/react";

const Filter = () => {
  return (
    <div className="h-[100%] w-[30%] p-5 pt-10">
      <Card className="py-4 sticky ">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">Filter Job Posts</h4>
        </CardHeader>
        <CardBody className="py-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Job Title</label>
            <Input placeholder="Enter job title" />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Location</label>
            <Input placeholder="Enter location" />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Experience Level</label>
            <Checkbox defaultValue={["Any"]}>
              <Checkbox value="Any">Any</Checkbox>
              <Checkbox value="Junior">Junior</Checkbox>
              <Checkbox value="Mid">Mid</Checkbox>
              <Checkbox value="Senior">Senior</Checkbox>
            </Checkbox>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Employment Type</label>
            <Checkbox defaultValue={["Full-Time"]}>
              <Checkbox value="Full-Time">Full-Time</Checkbox>
              <Checkbox value="Part-Time">Part-Time</Checkbox>
              <Checkbox value="Contract">Contract</Checkbox>
            </Checkbox>
          </div>

          <Button className="mt-4" color="primary">
            Apply Filters
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Filter;
