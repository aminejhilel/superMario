import { BoundingBox, Vector2D } from './Types';

export class Physics {
  public static checkAABB(rect1: BoundingBox, rect2: BoundingBox): boolean {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  public static checkAABBWithMargin(rect1: BoundingBox, rect2: BoundingBox, margin: number): boolean {
    return (
      rect1.x - margin < rect2.x + rect2.width &&
      rect1.x + rect1.width + margin > rect2.x &&
      rect1.y - margin < rect2.y + rect2.height &&
      rect1.y + rect1.height + margin > rect2.y
    );
  }

  public static resolveTileCollision(
    entity: { x: number; y: number; width: number; height: number; vx: number; vy: number; grounded: boolean },
    platform: BoundingBox & { isOneWay?: boolean }
  ): boolean {
    if (!this.checkAABB(entity, platform)) return false;

    // Calculate overlap depths
    const overlapX1 = entity.x + entity.width - platform.x;
    const overlapX2 = platform.x + platform.width - entity.x;
    const overlapY1 = entity.y + entity.height - platform.y;
    const overlapY2 = platform.y + platform.height - entity.y;

    const minX = Math.min(overlapX1, overlapX2);
    const minY = Math.min(overlapY1, overlapY2);

    if (platform.isOneWay) {
      // One way platform: resolve only when falling onto the top surface
      const prevBottom = entity.y + entity.height - entity.vy;
      if (prevBottom <= platform.y + 6 && entity.vy >= 0) {
        entity.y = platform.y - entity.height;
        entity.vy = 0;
        entity.grounded = true;
        return true;
      }
      return false;
    }

    if (minY < minX) {
      if (overlapY1 < overlapY2 && entity.vy >= 0) {
        // Collided with top of platform
        entity.y = platform.y - entity.height;
        entity.vy = 0;
        entity.grounded = true;
      } else if (overlapY2 < overlapY1 && entity.vy < 0) {
        // Collided with bottom of platform
        entity.y = platform.y + platform.height;
        entity.vy = 0;
      }
    } else {
      if (overlapX1 < overlapX2 && entity.vx > 0) {
        // Collided with left side
        entity.x = platform.x - entity.width;
        entity.vx = 0;
      } else if (overlapX2 < overlapX1 && entity.vx < 0) {
        // Collided with right side
        entity.x = platform.x + platform.width;
        entity.vx = 0;
      }
    }

    return true;
  }
}
