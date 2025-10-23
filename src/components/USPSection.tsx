import React from 'react';

interface USPItem {
  icon: string;
  title: string;
  description: string;
}

const USPSection: React.FC = () => {
  const uspItems: USPItem[] = [
    {
      icon: '↩️',
      title: '14 dní na výmenu/vrátenie',
      description: 'Zdarma a bez otázok',
    },
    {
      icon: '🚚',
      title: 'Doručenie 1-2 dni',
      description: 'Expresné doručenie po celom Slovensku',
    },
    {
      icon: '🎁',
      title: 'Vernostný program',
      description: 'Zbierajte body a získajte zľavy',
    },
    {
      icon: '✅',
      title: 'Certifikované materiály',
      description: 'Zdravotne nezávadné a priedušné',
    },
  ];

  return (
    <section className="py-8 bg-gradient-to-br from-primary-50 to-white border-y border-primary-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {uspItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;