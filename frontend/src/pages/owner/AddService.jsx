import ServiceForm from "../../components/owner/ServiceForm";

const AddService = () => {

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Add Service
            </h1>

            <ServiceForm />

        </div>
    );
};

export default AddService;