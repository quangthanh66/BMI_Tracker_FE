import { PlusOutlined } from "@ant-design/icons";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { Card, Col, Row } from "antd";
import { debounce } from "debounce";
import { ChangeEvent, useRef } from "react";
import CreateNewTagModal from "./modal/CreateNewTagModal";

type TFilterFoods = {
  addNewFood: () => void;
  searchFood: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FilterFoods = ({ addNewFood, searchFood }: TFilterFoods) => {
  const createNewTagRef = useRef<any>();

  return (
    <Card size="small">
      <CreateNewTagModal ref={createNewTagRef} />

      <div className="flex items-center justify-between">
        <Row gutter={[14, 14]} className="flex-1">
          <Col span={6}>
            <BaseInput
              placeholder="Search... "
              onChange={debounce(searchFood, 1000)}
            />
          </Col>
        </Row>

        <div className="flex items-center gap-x-2">
          <BaseButton
            icon={<PlusOutlined />}
            onClick={() => createNewTagRef.current.openModal()}
          >
            Create Tag
          </BaseButton>

          <BaseButton
            type="primary"
            icon={<PlusOutlined />}
            onClick={addNewFood}
          >
            Add
          </BaseButton>
        </div>
      </div>
    </Card>
  );
};

export default FilterFoods;
