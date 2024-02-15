import { useEffect, useRef } from "preact/hooks";

export function BoardFormDialog({
  open,
  handleClickMask
}: {
  open: boolean;
  handleClickMask: () => void;
}) {
  const refName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      refName.current?.focus();
    }
  }, [open]);

  if (open) {
    return (
      <>
        <div class="pattern-mask" />
        <dialog
          class="layout-center p-8 border-solid border-1 border-color-primary bg-primary w-full"
          open={open}
        >
          <form onSubmit={(e) => e.preventDefault()} class="layout-stack-8">
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
  } else {
    <></>;
  }
}
