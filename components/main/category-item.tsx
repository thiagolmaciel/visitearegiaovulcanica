type CategoryItemProps = {
    icon: React.ElementType;
    name: string;
    isSelected?: boolean;
  };

const CategoryItem = ({ icon, name, isSelected = false }: CategoryItemProps) => {
    const Icon = icon;
  return (
    <li className={`flex items-center justify-center gap-1 text-md py-2 px-3 rounded-full shadow-lg transition-colors ease-in-out duration-100 cursor-pointer ${
      isSelected 
        ? 'bg-[var(--main-color)]/80 text-white hover:bg-[var(--main-color)]/70' 
        : 'bg-[var(--main-color)] text-white hover:bg-[var(--main-color)]/90'
    }`}>
      <Icon />
      <p className="">{name}</p>
    </li>

  )
}

export default CategoryItem
