import { useContext, useEffect, useState } from "react";

// components
import Item from "./Item";
import ListHeader from "./ListHeader";
import Button from "./Button";

//etc
import { ItemSchema } from "../schema/ItemSchema";
import readList from "../api/readList";
import { UserContext } from "../../pages/user/[userId]";

interface Props {
  listId: string;
  currListName: string | undefined;
  setCurrListName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const List = (props: Props) => {
  const user = useContext(UserContext);
  const [itemArray, setItemArray] = useState<ItemSchema[]>([]);
  const [description, setDescription] = useState<string | undefined>();
  const [creatingItem, setCreatingItem] = useState(false);
  const [listLoaded, setListLoaded] = useState(false);

  /**
   * Readies list to respond accoridngly to new item interaction.
   * @note For more info, check Item.tsx
   */
  function createItemBtn() {
    const newItem = {
      itemName: "",
      userId: user?._id,
      listId: props.listId,
    } as ItemSchema;

    setItemArray((prev) => [...prev, newItem]);
    setCreatingItem(true);
  }

  useEffect(() => {
    async function initList() {
      const readListRes = await readList(user?._id, props.listId);
      if (typeof readListRes === "string") {
        console.log(readListRes);
        return;
      }

      setItemArray((prev) => readListRes.itemArray);
      setDescription(readListRes.description);
      props.setCurrListName(readListRes.listName);
    }

    initList();
    setListLoaded(true);
  }, [props, user?._id]);

  return (
    <>
      <ListHeader
        listId={props.listId}
        description={description}
        setDescription={setDescription}
        setCurrListName={props.setCurrListName}
        currListName={props.currListName}
      />

      <hr className="border-dark-300" />

      <div className="flex flex-col gap-y-2 items-start">
        {itemArray.length !== 0 ? (
          itemArray.map((item, index) => (
            <Item
              key={index}
              item={item}
              itemIndex={index}
              setItemArray={setItemArray}
              listId={props.listId}
              setCreatingItem={setCreatingItem}
              isNewItem={
                creatingItem && index === itemArray.length - 1 ? true : false
              }
            />
          ))
        ) : (
          <p>There is no item in the list! Start by adding one!</p>
        )}

        <Button onClick={() => createItemBtn()}>create item</Button>
      </div>
    </>
  );
};

export default List;
