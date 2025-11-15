"use client";

import { useState, useEffect } from "react";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "next/navigation";
import {
  setModules,
  addModule,
  editModule,
  updateModule,
  deleteModule,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const onUpdateModule = async (updatedModule: any) => {
    await client.updateModule(updatedModule);
    const newModules = modules.map((m: any) =>
      m._id === updatedModule._id ? updatedModule : m
    );
    dispatch(setModules(newModules));
  };

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const createdModule = await client.createModuleForCourse(
      cid as string,
      newModule
    );
    dispatch(setModules([...modules, createdModule]));
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const fetchModules = async () => {
    const found = await client.findModulesForCourse(cid as string);
    dispatch(setModules(found));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={onCreateModuleForCourse}
      />
      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((mod: any, index: number) => (
          <ListGroupItem
            key={mod._id || index}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!mod.editing && mod.name}
              {mod.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(updateModule({ ...mod, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...mod, editing: false });
                    }
                  }}
                  defaultValue={mod.name}
                />
              )}
              <ModuleControlButtons
                moduleId={mod._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>
            {mod.lessons && (
              <ListGroup
                key={mod._id ? `${mod._id}-lessons` : `lessons-${index}`}
                className="wd-lessons rounded-0"
              >
                {mod.lessons.map((lesson: any, li: number) => (
                  <ListGroupItem
                    key={lesson._id || `${mod._id || index}-lesson-${li}`}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
