type CategoryItemProps = {
    icon: React.ElementType;
    name: string;
  };

const CategoryItem = ({ icon, name }: CategoryItemProps) => {
    const Icon = icon;
  return (
    <li className="flex items-center justify-center gap-1 text-md text-[#353535] font-semibold bg-[#eeeeee] py-2 px-3 rounded-full shadow-md hover:-translate-y-0.5 transition-all ease-in-out duration-100 cursor-pointer active:bg-[#f7f7f7]"><Icon /><p className="">{name}</p></li>

  )
}

export default CategoryItem
