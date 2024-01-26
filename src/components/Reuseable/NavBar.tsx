import React from 'react';

const NavBar = ({ navItems, activeTab, onTabClick }: any) => {
    return (
        <nav className="bg-white p-4 rounded-lg">
            {navItems.map((item: any, index: any) => (
                <a
                    key={index}
                    href="#"
                    className={`inline-block px-4 py-2 rounded-lg ${activeTab === index
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                    onClick={() => onTabClick(index)}
                >
                    {item.title}
                </a>
            ))}
        </nav>
    );
};

export default NavBar;
