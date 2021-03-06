const path = require('path');
const convert = require('convert-units');

const getPluginItem = ({ inputStr }) => {
  const items = [];
  if (!inputStr) return { items: [] };

  const [targetNumAndUnit, ...others] = inputStr.split(' ');
  const num = Number(targetNumAndUnit.match(/\d+/g));
  if (!num) return { items: [] };
  const unit = targetNumAndUnit.split(num)[1];
  if (!unit) return { items: [] };
  const possibleUnits = convert().from(unit).possibilities();

  if (!others || others.length === 0) {
    possibleUnits.map((possibleUnit) => {
      const converted = String(convert(num).from(unit).to(possibleUnit)) + possibleUnit;
  
      items.push({
        title: converted,
        subtitle: `${num}${unit} = ${converted}`,
        icon: {
          path: `${__dirname}${path.sep}icon.png`,
        },
      });
    });
  } else if (others.length === 1 && others[0] && possibleUnits.includes(others[0])) {
    const targetUnit = others[0];
    const converted = String(convert(num).from(unit).to(targetUnit)) + targetUnit;

    items.push({
      title: converted,
      subtitle: `${num}${unit} = ${converted}`,
      icon: {
        path: `${__dirname}${path.sep}icon.png`,
      },
    });

  } else if (others.length > 1 && others[0] === 'to' && possibleUnits.includes(others[1])) {
    const targetUnit = others[1];
    const converted = String(convert(num).from(unit).to(targetUnit)) + targetUnit;

    items.push({
      title: converted,
      subtitle: `${num}${unit} = ${converted}`,
      icon: {
        path: `${__dirname}${path.sep}icon.png`,
      },
    });
  }

  return {
    items,
  };
};

// Export a function that has inputStr as a argument.
module.exports = getPluginItem;