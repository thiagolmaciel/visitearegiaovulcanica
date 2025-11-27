type CategoryItemProps = {
    icon: React.ElementType;
    name: string;
    isSelected?: boolean;
  };

const CategoryItem = ({ icon, name, isSelected = false }: CategoryItemProps) => {
    const Icon = icon;
  return (
    <li className={`flex items-center justify-center gap-1 text-md font-semibold py-2 px-3 rounded-full shadow-md hover:-translate-y-0.5 transition-all ease-in-out duration-100 cursor-pointer ${
      isSelected 
        ? 'bg-[var(--main-color)] text-white' 
        : 'text-[#353535] bg-[#eeeeee] active:bg-[#f7f7f7]'
    }`}>
      <Icon />
      <p className="">{name}</p>
    </li>

  )
}

export default CategoryItem
