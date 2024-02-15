import { useEffect, useRef } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

export function BoardFormDialog({
  open,
  handleClickMask,
  addBoard
}: {
  open: boolean;
  handleClickMask: () => void;
  addBoard: (name: string) => void;
}) {
  const refName = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (refName.current) {
      if (refName.current.value !== "") {
        addBoard(refName.current.value);
        handleClickMask();
      }
    }
  };

  useEffect(() => {
    if (open) {
      refName.current?.focus();
    }
  }, [open]);

  if (open) {
    return (
      <>
        <div class="pattern-mask" onClick={handleClickMask} />
        <dialog
          class="layout-center p-8 border-solid border-1 border-color-primary bg-primary w-full"
          open={open}
        >
          <form onSubmit={handleSubmit} class="layout-stack-8">
            <div class="layout-stack-4">
              <label class="flex-column layout-stack-2">
                <span class="text-secondary text-small">Board name</span>
                <input
                  class="h-8 w-64 px-2 border-solid border-1 border-color-primary"
                  type="text"
                  maxlength={24}
                  ref={refName}
                />
              </label>
              <div class="layout-stack-2">
                <div class="text-secondary text-small">Default lists</div>
                <div class="flex-column border-none text-secondary text-small layout-stack-1 pl-2">
                  <label>
                    <input type="radio" value="None" class="" checked={true} />
                    <span class="px-1">None</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Preset"
                      class=""
                      checked={false}
                    />
                    <span class="px-1">Todo, Doing, Done</span>
                  </label>
                </div>
              </div>
              <div class="layout-stack-2">
                <div class="text-secondary text-small">Board color</div>
                <div class="text-secondary text-small layout-stack-horizontal-1">
                  <label>
                    <input type="radio" value="None" class="" checked={true} />
                    <span class="px-1">None</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Preset"
                      class=""
                      checked={false}
                    />
                    <span class="px-1">Todo, Doing, Done</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="">
              <button class="h-6 px-4 border-solid border-1 border-color-primary cursor-pointer bg-transparent">
                Create
              </button>
            </div>
          </form>
        </dialog>
      </>
    );
  }
  return <></>;
}
