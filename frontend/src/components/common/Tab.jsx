const Tab = ({ tabData, field, setField }) => {
  return (
    <div
      style={{
        boxShadow:
          "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="
        my-6
        w-full
        overflow-x-auto
        scrollbar-hide
      "
    >
      <div
        className="
          flex
          w-max
          min-w-full
          gap-1
          rounded-full
          bg-richBlack-800
          p-1
          sm:w-fit
          sm:min-w-0
        "
      >
        {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setField(tab.type)}
            className={`
              whitespace-nowrap
              rounded-full
              px-4 py-2
              text-sm
              transition-all duration-200
              sm:px-5
              sm:text-base
              ${
                field === tab.type
                  ? "bg-richBlack-900 text-richBlack-5"
                  : "bg-transparent text-richBlack-200"
              }
            `}
          >
            {tab?.tabName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tab;