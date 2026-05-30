import StaffCard from "./StaffCard";

const StaffList = ({ staffList }) => {
  console.log(staffList)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {Array.isArray(staffList) &&
        staffList.map((staff) => (
          <StaffCard
            key={staff.staffId}
            staff={staff}
          />
      ))}

    </div>
  );
};

export default StaffList;